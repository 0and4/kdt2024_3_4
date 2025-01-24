package com.berry_comment.exception;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum ErrorCode {
    INVALID_TIME_REQUEST("잘못된 시간을 기입하셨습니다.");

    private final String message;
}
