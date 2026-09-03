package com.noolcredit.entity;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import lombok.*;
import java.time.LocalDateTime;

@Document(collection = "notifications")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Notification {

    @Id
    private String id;

    private String userId;

    private String title;

    private String message;

    @Builder.Default
    private Boolean readStatus = false;

    @Builder.Default
    private LocalDateTime createdAt = LocalDateTime.now();
}
