package com.berry_comment.repository;

import com.berry_comment.entity.Album;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface AlbumRepository extends JpaRepository<Album, Long> {
    Optional<Album> findByName(String albumName);

    Slice<Album> findByNameContaining(String albumName, Pageable pageable);
}
