package hotel.service.impl;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import hotel.model.Reservation;
import hotel.model.User;
import hotel.repository.ReservationRepository;
import hotel.repository.UserRepository;
import hotel.service.ReservationService;

@Service
public class JpaReservationService implements ReservationService {

	@Autowired
	private ReservationRepository reservationRepository;

	@Autowired
	private UserRepository userRepository;

	@Override
	public Page<Reservation> findAll(int page) {
		return reservationRepository.findAll(PageRequest.of(page, 5));
	}

	@Override
	public Page<Reservation> find(Double priceFrom, Double priceTo, Long roomId, int pageNo) {
		if (priceFrom == null) {
			priceFrom = 0.0;
		}
		if (priceTo == null) {
			priceTo = Double.MAX_VALUE;
		}
		return reservationRepository.search(priceFrom, priceTo, roomId, PageRequest.of(pageNo, 5));
	}

	@Override
	public Reservation findOne(Long id) {
		return reservationRepository.findOneById(id);
	}

	@Override
	public List<Reservation> findAll() {
		return reservationRepository.findAll();
	}

	@Override
	public Reservation delete(Long id) {
		Reservation reservation = reservationRepository.findOneById(id);
		if (reservation != null) {
			reservationRepository.deleteById(id);
			return reservation;
		}
		return null;
	}

	@Override
	public Reservation createReservation(String username, Reservation reservation) {
		Optional<User> user = userRepository.findFirstByUsername(username);
		if (!user.isPresent()) {
			return null;
		}

		return reservationRepository.save(reservation);

	}

	@Override
	public Reservation updateReservation(String username, Reservation reservation) {
		Optional<User> user = userRepository.findFirstByUsername(username);
		if (!user.isPresent()) {
			return null;
		}
		return reservationRepository.save(reservation);
	}

	@Override
	public List<Reservation> findByUserId(Long userId) {
		return reservationRepository.findByUserId(userId);
	}

	@Override
	public List<Reservation> getReservationsByUsername(String username) {
		Optional<User> user = userRepository.findFirstByUsername(username);
		if (!user.isPresent()) {
			return null;
		}
		Long userId = user.get().getId();
		return reservationRepository.findByUserId(userId);
	}

	@Override
	public List<Reservation> findByRoomId(Long roomId) {
		return reservationRepository.findByRoomId(roomId);
	}
}
