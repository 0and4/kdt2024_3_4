package com.berry_comment.service;

import com.berry_comment.dto.CrawlInfoDto;
import com.berry_comment.repository.ChartRepository;
import lombok.RequiredArgsConstructor;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.concurrent.atomic.AtomicInteger;

@Service
@RequiredArgsConstructor
public class CrawlerService {

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
    private final ChartRepository chartRepository;

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
            rankElements.stream().forEach(element -> {
                //곡 ID
                int dataSongId = Integer.parseInt(element.selectFirst("tr").attr("data-song-no"));

                //곡 이름
                String songTitle = element.selectFirst("a[title*='재생']").text();

                //아티스트 이름
                StringBuilder artist = new StringBuilder();

                Elements artistElements = element.select("div.ellipsis.rank02 a");
                System.out.println("아티스트 수" + artistElements.size());
                for(int i = 0;i < artistElements.size();i++) {
                    Element artistElement = artistElements.get(i);
                    //중복된 값이 있으면 빼기
                    if(artist.toString().contains(artistElement.text())) continue;
                    //만약 첫번째가 아니라면 ,추가
                    if(i != 0) artist.append(", ");
                    artist.append(artistElement.text());
                }

                //5앨범 제목 추출
                // 5. 앨범 제목 추출
                String albumTitle = element.selectFirst("div.ellipsis.rank03 a").text();
                String imageUrl = element.selectFirst("img").attr("src");

                System.out.printf("곡 아이디: %d 곡 이름: %s 아티스트: %s 앨범: %s 이미지 url: %s\n",dataSongId,songTitle,artist.toString(),albumTitle,imageUrl);
                crawlInfoDtoArrayList.add(
                        CrawlInfoDto.builder()
                                .songId(dataSongId)
                                .song(songTitle)
                                .artist(artist.toString())
                                .album(albumTitle)
                                .url(imageUrl)
                                .rank(rank.getAndIncrement())
                                .build()
                );
                System.out.println(rank.get());
            });
        } catch (Exception e) {
            System.out.println(e.getMessage());
        }
        save(crawlInfoDtoArrayList);
    }

    public void save(ArrayList<CrawlInfoDto> crawlInfoDtoArrayList) {

    }
}
