package com.ssafy.kirin.entity;

import lombok.*;
import org.hibernate.annotations.Formula;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Table(name = "challenge_comment")
public class ChallengeComment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long id;

    String content;
    LocalDateTime reg;

    @Column(name = "is_comment")
    Boolean isComment;

    @Column(name = "parent_id")
    Long parentId;

    @ManyToOne
    @JoinColumn(name = "user_id")
    User user;

    @ManyToOne
    @JoinColumn(name = "challenge_id")
    Challenge challenge;

    @Formula("(SELECT COUNT(*) FROM challenge_comment_like l WHERE l.challenge_comment_id = id)")
    Integer likeCnt;
}
