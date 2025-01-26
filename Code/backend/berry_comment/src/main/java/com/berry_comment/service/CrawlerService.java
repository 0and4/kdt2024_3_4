package com.berry_comment.service;

import com.berry_comment.dto.ArtistDto;
import com.berry_comment.dto.CrawlInfoDto;
import com.berry_comment.entity.*;
import com.berry_comment.repository.*;
import lombok.RequiredArgsConstructor;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.io.IOException;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.Optional;
import java.util.Set;
import java.util.concurrent.atomic.AtomicInteger;

@Service
@RequiredArgsConstructor
public class CrawlerService {
    private final SongRepository songRepository;
    private final AlbumRepository albumRepository;
    private final ChartRepository chartRepository;
    private final ChartDetailRepository chartDetailRepository;
    private final LastFmService lastFmService;
    private final SongOfArtistRepository songOfArtistRepository;
    //TODO
    /*
        매 시간 마다 Top100 스케줄러를 실행
        음악 정보를 들고 온다
       1. 음악 테이블 --> 그 다음 이미 존재하는 음악이라면 내용을 저장하지 않고
            존재하지 않는 음악이라면 넣기

       2. 앨범테이블 --> 이미 존재하는 앨범이면 넣지 않기

       3. 차트 정보에 정보 넣어주기

       4. 아티스트 정보 갱신하기
    * */
    private final ArtistRepository artistRepository;


    //크롤링 정보 수정
    public void crawl(LocalDateTime localDateTime) {
        ArrayList<CrawlInfoDto> crawlInfoDtoArrayList = new ArrayList<>();
        String queryParamTime = String.format("%s%s%s%s",localDateTime.getYear(),localDateTime.getMonthValue(),localDateTime.getDayOfMonth(),localDateTime.getHour());
        int queryParamTimeInt = Integer.parseInt(queryParamTime);
        //모든 정보를 크롤링합니다.
        //크롤링할 url
        System.out.println("test실행..");
        String url = "https://www.melon.com/chart/index.htm?dayTime="+queryParamTimeInt;
        try {
            //rank XPath = //*[@id="lst50"]/td[2]/div/span[1], //*[@id="lst50"]/td[2]/div/span[1]
            Document document = Jsoup.connect(url).get();
            //table body xPath = //*[@id="frm"]/div/table/tbody
            Elements tBodyElements = document.selectXpath("//*[@id=\"frm\"]/div/table/tbody");
            Element tBodyElement = tBodyElements.getFirst();
            Elements rankElements = tBodyElement.getElementsByTag("tr");
            AtomicInteger rank = new AtomicInteger(1);
            //아티스트 셋
            rankElements.stream().forEach(element -> {
                CrawlInfoDto crawlInfoDto = new CrawlInfoDto();
                crawlInfoDto.setArtists(new ArrayList<>());
                //곡 ID
                int dataSongId = Integer.parseInt(element.selectFirst("tr").attr("data-song-no"));

                //곡 이름
                String songTitle = element.selectFirst("a[title*='재생']").text();
//                Elements artistElements = element.select("div.ellipsis.rank02 a");
//                //중복된 값을 넣게 하지 않기 위함...
//                Set<String> artistSet = new HashSet<>();
//
//                for(int i = 0;i < artistElements.size();i++) {
//                    Element artistElement = artistElements.get(i);
//                    //중복된 값이 들어가도 오류 X
//                    artistSet.add(artistElement.text());
//                }
//                artistSet.forEach(
//                        artist -> {
//                            System.out.println("아티스트들: "+artist);
//                        }
//                );

                //5앨범 제목 추출
                // 5. 앨범 제목 추출
                String albumTitle = element.selectFirst("div.ellipsis.rank03 a").text();
                String imageUrl = element.selectFirst("img").attr("src");
                crawlInfoDto.setSongId((long) dataSongId);
                crawlInfoDto.setSong(songTitle);
                crawlInfoDto.setRank(rank.getAndIncrement());
                crawlInfoDto.setAlbum(albumTitle);
                crawlInfoDto.setUrl(imageUrl);
                setGenreAndArtist((long)dataSongId, crawlInfoDto);
                crawlInfoDtoArrayList.add(crawlInfoDto);
            });
        } catch (Exception e) {
            System.out.println(e.getMessage());
        }
        save(crawlInfoDtoArrayList, localDateTime);
    }

    public void setGenreAndArtist(Long songId, CrawlInfoDto crawlInfoDto){

        String url = "https://www.melon.com/song/detail.htm?songId=" + songId;
        try{
            Document document = Jsoup.connect(url).userAgent("Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36").get();
            Elements elements = document.getElementsByTag("dd");
            String genre = elements.get(2).text();
            System.out.println("장르 "+ genre);
            crawlInfoDto.setGenre(genre);

            Elements artistElements = document.selectXpath("//*[@id=\"downloadfrm\"]/div/div/div[2]/div[1]");
            artistElements = artistElements.get(0).getElementsByClass("artist_name");
            for (Element element : artistElements) {
                ArtistDto artistDto = new ArtistDto();
                String artistName = element.selectFirst("span").text();
                Element imgElement = element.selectFirst("span.thumb_atist img");
                String imageUrl = (imgElement != null) ? imgElement.attr("src") : "";
                System.out.println("아티스트 이름: " + artistName);
                System.out.println("이미지 URL: " + imageUrl);
                artistDto.setArtistName(artistName);
                artistDto.setImageUrl(imageUrl);
                crawlInfoDto.getArtists().add(artistDto);
            }


        } catch (IOException e) {

        }
    }

    @Transactional
    public void save(ArrayList<CrawlInfoDto> crawlInfoDtoArrayList, LocalDateTime localDateTime) {
        //분과 초는 0으로 지정 시간만 값이 있음
        localDateTime = LocalDateTime.of(localDateTime.getYear(), localDateTime.getMonthValue(),localDateTime.getDayOfMonth(),localDateTime.getHour(),0,0);
        //현재 시간대의 chart가 있다면 종료...
        if(chartRepository.findByDateTime(localDateTime)!=null)
            return;

        Chart chart = new Chart(localDateTime);
        //차트를 저장합니다.
        chartRepository.save(chart);

        //음악 저장 로직
        crawlInfoDtoArrayList.forEach(crawlInfoDto -> {
            try {
                //음악 엔티티
                Song addSong;

                //앨범 엔티티
                Album album;

                //아티스트 엔티티
                Set<Artist> artistsSet = new HashSet<>();

                //엔티티 저장 순서 아티스트 -> (앨범 -> 앨범아티스트디테일)
                crawlInfoDto.getArtists().forEach(artistDto -> {
                    System.out.println("아티스트 찾기");
                    Optional<Artist> artist = artistRepository.findByName(artistDto.getArtistName());
                    //만약 존재하지 않는 아티스트라면
                    if(artist.isEmpty()){
                        //새로운 아티스트 추가
                        Artist newArtist = new Artist(artistDto.getArtistName(), artistDto.getImageUrl());

                        //아티스트DB에 아티스트추가
                        artistRepository.save(newArtist);
                        artistsSet.add(newArtist);
                    }
                    else {
                        artistsSet.add(artist.get());
                    }
                });

                //앨범 저장 로직
                if (albumRepository.findByName(crawlInfoDto.getAlbum()).isPresent())
                    album = albumRepository.findByName(crawlInfoDto.getAlbum()).get();
                else {
                    album = new Album(crawlInfoDto.getUrl(), crawlInfoDto.getAlbum());
                    albumRepository.save(album);
                    System.out.println("앨범 엔티티"+album);
                }
                

                //음악 저장 로직
                if (songRepository.findById(crawlInfoDto.getSongId()).isPresent())
                    addSong = songRepository.findById(crawlInfoDto.getSongId()).get();
                else {
                    //저장하기전에 LastFmApi에서 재생 시간 가져오기
                    //단위값은 millSeconds이다.
                    //저장할 playTime 값
                    int playTime = 0;
                    for (Artist artist : artistsSet) {
                        try {
                            int time = lastFmService.getSongPlayTime(crawlInfoDto.getSong(), artist.getName());
                            if (time != 0) {
                                playTime = time;
                                break; // foreach문 탈출
                            }
                        } catch (Exception e) {
                            playTime = 0;
                        }
                    }

                    //음악 저장후
                    addSong = new Song(crawlInfoDto.getSongId(), crawlInfoDto.getSong(), playTime, album, crawlInfoDto.getGenre());
                    songRepository.save(addSong);

                    //앨범 디테일 저장하기
                    artistsSet.forEach(artist -> {
                        //곡에 아티스트들 할당하기
                        SongOfArtist songOfArtist = new SongOfArtist(artist, addSong);
                        songOfArtistRepository.save(songOfArtist);
                    });
                }
                //차트 정보 저장하기
                ChartDetail chartDetail = new ChartDetail(chart, addSong, crawlInfoDto.getRank());
                chartDetailRepository.save(chartDetail);
            }catch (Exception e){
                System.out.println(e.getMessage());
            }
        });
    }

}
