package hotel.service;

import java.time.LocalDate;
import java.util.List;

import org.springframework.data.domain.Page;

import hotel.model.Room;

public interface RoomService {

	List<Room> findAll();

	Page<Room> findAll(int pageNo);

	Room findOne(Long id);

	Page<Room> find(Double priceFrom, Double priceTo, Integer capacity, int pageNo);

	List<Integer> getAllCapacities();

	List<Room> getAvailableRooms(LocalDate startDate, LocalDate endDate, Integer capacity);

}
