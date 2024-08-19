package hotel.service;

import java.util.List;

import org.springframework.data.domain.Page;

import hotel.model.Reservation;

public interface ReservationService {

	Page<Reservation> findAll(int page);

	Page<Reservation> find(Double priceFrom, Double priceTo, Long roomId, int pageNo);

	Reservation findOne(Long id);

	List<Reservation> findAll();

	Reservation delete(Long id);

	Reservation createReservation(String username, Reservation reservation);

	Reservation updateReservation(String username, Reservation reservation);

	List<Reservation> findByUserId(Long userId);

	List<Reservation> getReservationsByUsername(String username);

}
