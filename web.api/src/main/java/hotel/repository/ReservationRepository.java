package hotel.repository;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import hotel.model.Reservation;

@Repository
public interface ReservationRepository extends JpaRepository<Reservation, Long> {

	Reservation findOneById(Long reservationId);

	@Query("SELECT r FROM Reservation r WHERE" + "(:priceFrom IS NULL OR r.totalPrice >= :priceFrom) AND "
			+ "(:priceTo IS NULL OR r.totalPrice <= :priceTo) AND" + "(:roomId IS NULL OR r.room.id = :roomId)")
	Page<Reservation> search(@Param("priceFrom") Double priceFrom, @Param("priceTo") Double priceTo,
			@Param("roomId") Long roomId, Pageable pageable);

	List<Reservation> findByUserId(Long userId);
	
	List<Reservation> findByRoomId(Long roomId);

}
