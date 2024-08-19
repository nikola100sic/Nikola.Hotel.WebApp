package hotel.service.impl;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import hotel.model.Reservation;
import hotel.model.Room;
import hotel.repository.RoomRepository;
import hotel.service.RoomService;

@Service
public class JpaRoomService implements RoomService {
	@Autowired
	private RoomRepository roomRepository;

	@Override
	public List<Room> findAll() {
		return roomRepository.findAll();
	}

	@Override
	public Page<Room> findAll(int pageNo) {
		return roomRepository.findAll(PageRequest.of(pageNo, 5));
	}

	@Override
	public Room findOne(Long id) {
		return roomRepository.findOneById(id);
	}

	@Override
	public Page<Room> find(Double priceFrom, Double priceTo, Integer capacity, int pageNo) {
		if (priceFrom == null) {
			priceFrom = 0.0;
		}
		if (priceTo == null) {
			priceTo = Double.MAX_VALUE;
		}
		return roomRepository.search(priceFrom, priceTo, capacity, PageRequest.of(pageNo, 10));
	}

	@Override
	public List<Integer> getAllCapacities() {
		return roomRepository.findAllCapacities();
	}

	@Override
	public List<Room> getAvailableRooms(LocalDate startDate, LocalDate endDate, Integer capacity) {
		List<Room> allRooms = roomRepository.findAll();
		List<Room> availableRooms = new ArrayList<>();

		for (Room room : allRooms) {
			boolean isAvailable = true;

			// Check if room is reserved in the specified period
			for (Reservation reservation : room.getReservations()) {
				if ((reservation.getStartDate().isBefore(endDate) || reservation.getStartDate().isEqual(endDate))
						&& (reservation.getEndDate().isAfter(startDate)
								|| reservation.getEndDate().isEqual(startDate))) {
					isAvailable = false;
					break;
				}
			}

			if (isAvailable) {
				if (capacity == null || room.getCapacity().equals(capacity)) {
					availableRooms.add(room);
				}
			}
		}

		return availableRooms;
	}

}
