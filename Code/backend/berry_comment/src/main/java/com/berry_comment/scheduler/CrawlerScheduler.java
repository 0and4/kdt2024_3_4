package com.berry_comment.scheduler;

import com.berry_comment.service.CrawlerService;
import lombok.RequiredArgsConstructor;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;

@Component
@RequiredArgsConstructor
public class CrawlerScheduler {
    private final CrawlerService crawlerService;
    @Scheduled(cron = "0 0 * * * ?")
    public void crawlerScheduler() {
        System.out.println("CrawlerScheduler.crawlerScheduler() : 스케줄링을 실행합니다.");
        //실행되는 시점에 크롤링하기
        crawlerService.crawl(LocalDateTime.now());
    }

}
