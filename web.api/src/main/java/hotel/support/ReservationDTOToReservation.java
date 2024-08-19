package hotel.support;

import java.time.DateTimeException;
import java.time.Duration;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.convert.converter.Converter;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;

import hotel.model.Reservation;
import hotel.model.Room;
import hotel.model.User;
import hotel.service.ReservationService;
import hotel.service.RoomService;
import hotel.service.UserService;
import hotel.web.dto.ReservationDTO;

@Component
public class ReservationDTOToReservation implements Converter<ReservationDTO, Reservation> {

	@Autowired
	private UserService userService;

	@Autowired
	private RoomService roomService;
	@Autowired
	private ReservationService reservationService;

	@Override
	public Reservation convert(ReservationDTO dto) {
		Optional<User> optionalUser = userService.findbyUsername(dto.getUsername());
		User user = optionalUser
				.orElseThrow(() -> new UsernameNotFoundException("User not found with username: " + dto.getUsername()));
		Room room = roomService.findOne(dto.getRoomId());

		Double priceForNight = room.getPrice();
		LocalDate startDate = getLocalDate(dto.getStartDate());
		LocalDate endDate = getLocalDate(dto.getEndDate());
		Long numberOfDays = Duration.between(startDate.atStartOfDay(), endDate.atStartOfDay()).toDays();

		Reservation reservation;
		if (dto.getId() == null) {
			reservation = new Reservation();
		} else {
			reservation = reservationService.findOne(dto.getId());
		}
		if (reservation != null) {
			reservation.setId(dto.getId());
			reservation.setStartDate(getLocalDate(dto.getStartDate()));
			reservation.setEndDate(getLocalDate(dto.getEndDate()));
			reservation.setRoom(roomService.findOne(dto.getRoomId()));
			reservation.setTotalPrice(numberOfDays * priceForNight);
			reservation.setUser(user);

		}
		return reservation;
	}

	private LocalDate getLocalDate(String date) throws DateTimeException {
		DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
		return LocalDate.parse(date, formatter);
	}

}
