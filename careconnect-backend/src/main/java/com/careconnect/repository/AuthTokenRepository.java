
package com.careconnect.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.transaction.annotation.Transactional;

import com.careconnect.entity.AuthToken;
import com.careconnect.entity.User;

public interface AuthTokenRepository
        extends JpaRepository<AuthToken, Long> {

    Optional<AuthToken> findByToken(String token);

    @Transactional
    @Modifying
    @Query("DELETE FROM AuthToken a WHERE a.token = :token")
    void deleteByToken(String token);

    @Transactional
    @Modifying
    @Query("DELETE FROM AuthToken a WHERE a.user = :user")
    void deleteByUser(User user);
}
