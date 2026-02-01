package com.porsche.repository;

import com.porsche.model.SavedCard;
import com.porsche.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SavedCardRepository extends JpaRepository<SavedCard, Long> {

    List<SavedCard> findByUserOrderByCreatedAtDesc(User user);

    List<SavedCard> findByUserId(Long userId);
}
