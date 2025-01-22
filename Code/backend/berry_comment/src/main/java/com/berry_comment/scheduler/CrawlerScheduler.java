package com.berry_comment.scheduler;

import org.springframework.scheduling.annotation.Scheduled;

public class CrawlerScheduler {

    @Scheduled(cron = "0 0 * * * ?")
    public void crawlerScheduler() {
        System.out.println("CrawlerScheduler.crawlerScheduler() : 스케줄링을 실행합니다.");

    }

}
