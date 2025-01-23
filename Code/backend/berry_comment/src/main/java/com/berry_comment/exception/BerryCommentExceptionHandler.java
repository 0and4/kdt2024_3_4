package com.berry_comment.exception;

import com.berry_comment.dto.BerryCommentErrorResponse;
import jakarta.servlet.http.HttpServletRequest;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
@RestControllerAdvice
@Slf4j
public class BerryCommentExceptionHandler {
    //예외처리를 감지하는 핸들러
    @ResponseStatus(value = HttpStatus.BAD_REQUEST)
    @ExceptionHandler(value = BerryCommentException.class)
    @ResponseBody
    public BerryCommentErrorResponse handleException(BerryCommentException e, HttpServletRequest request) {
        log.error(e.getMessage());
        return BerryCommentErrorResponse
                .builder()
                .errorCode(e.getErrorCode())
                .errorMessage(e.getMessage())
                .build();
    }

}
