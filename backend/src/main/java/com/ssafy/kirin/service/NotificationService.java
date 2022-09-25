package com.ssafy.kirin.service;

import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

public interface NotificationService {
    SseEmitter subscribe(Long userId, SseEmitter sseEmitter);
    void sendToClient(SseEmitter emitter, String id, Object data);
    void send(Long userId);
}