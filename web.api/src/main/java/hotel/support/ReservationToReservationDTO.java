package hotel.support;

import java.util.ArrayList;
import java.util.List;

import org.springframework.core.convert.converter.Converter;
import org.springframework.stereotype.Component;

import hotel.model.Reservation;
import hotel.web.dto.ReservationDTO;

@Component
public class ReservationToReservationDTO implements Converter<Reservation, ReservationDTO> {

	@Override
	public ReservationDTO convert(Reservation reservation) {
		ReservationDTO dto = new ReservationDTO();
		dto.setId(reservation.getId());
		dto.setUserId(reservation.getUser().getId());
		dto.setUsername(reservation.getUser().getUsername());
		dto.setTotalPrice(reservation.getTotalPrice());
		dto.setStartDate(reservation.getStartDate().toString());
		dto.setEndDate(reservation.getEndDate().toString());
		dto.setRoomId(reservation.getRoom().getId());
		dto.setRoomNumber(reservation.getRoom().getNumber());
		return dto;
	}

	public List<ReservationDTO> convert(List<Reservation> reservations) {
		List<ReservationDTO> reservationDTOs = new ArrayList<>();

		for (Reservation reservation : reservations) {
			reservationDTOs.add(convert(reservation));
		}

		return reservationDTOs;
	}

}
