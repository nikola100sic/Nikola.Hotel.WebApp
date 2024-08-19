package hotel.repository;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import hotel.model.Room;

@Repository
public interface RoomRepository extends JpaRepository<Room, Long> {

	Room findOneById(Long roomId);

	@Query("SELECT r FROM Room r WHERE" + "(:priceFrom IS NULL OR r.price >= :priceFrom) AND "
			+ "(:priceTo IS NULL OR r.price <= :priceTo) AND" + "(:capacity IS NULL OR r.capacity = :capacity)")
	Page<Room> search(@Param("priceFrom") Double priceFrom, @Param("priceTo") Double priceTo,
			@Param("capacity") Integer capacity, Pageable pageable);

	@Query("SELECT r.capacity FROM Room r")
	List<Integer> findAllCapacities();

}
