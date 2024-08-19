package hotel.web.controller;

import java.util.List;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import hotel.model.Reservation;
import hotel.service.ReservationService;
import hotel.support.ReservationDTOToReservation;
import hotel.support.ReservationToReservationDTO;
import hotel.web.dto.ReservationDTO;

@RestController
@RequestMapping(value = "/api/reservations", produces = MediaType.APPLICATION_JSON_VALUE)
public class ReservationController {

	@Autowired
	private ReservationDTOToReservation toReservation;

	@Autowired
	private ReservationToReservationDTO toReservationDTO;

	@Autowired
	private ReservationService reservationService;

	@GetMapping
	@PreAuthorize("hasAnyAuthority('ADMIN')")
	public ResponseEntity<List<ReservationDTO>> getAll(@RequestParam(required = false) Double priceFrom,
			@RequestParam(required = false) Double priceTo, @RequestParam(required = false) Long roomId,
			@RequestParam(value = "pageNo", defaultValue = "0") int pageNo) {

		Page<Reservation> page;

		page = reservationService.find(priceFrom, priceTo, roomId, pageNo);

		HttpHeaders headers = new HttpHeaders();
		headers.add("Total-Pages", Integer.toString(page.getTotalPages()));

		return new ResponseEntity<>(toReservationDTO.convert(page.getContent()), headers, HttpStatus.OK);
	}

	@PostMapping(consumes = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<ReservationDTO> create(@Valid @RequestBody ReservationDTO reservationDTO) {

		if (reservationDTO.getRoomId() == null || reservationDTO.getUsername() == null) {
			return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
		}

		Reservation reservation = toReservation.convert(reservationDTO);
		if (reservation == null || reservation.getStartDate().isAfter(reservation.getEndDate())) {
			return new ResponseEntity<>(HttpStatus.BAD_REQUEST);

		}
		Reservation saved = reservationService.createReservation(reservation.getUser().getUsername(), reservation);
		if (saved == null) {
			return new ResponseEntity<>(HttpStatus.NOT_ACCEPTABLE);
		}
		return new ResponseEntity<>(toReservationDTO.convert(saved), HttpStatus.CREATED);
	}

	@GetMapping("/user/{username}")
	public ResponseEntity<List<ReservationDTO>> getReservationsByUsername(@PathVariable String username) {
		List<Reservation> reservations = reservationService.getReservationsByUsername(username);
		return new ResponseEntity<>(toReservationDTO.convert(reservations), HttpStatus.OK);
	}
	@GetMapping("/{roomId}")
	public ResponseEntity<List<ReservationDTO>> getReservationsByRoomId(@PathVariable Long roomId) {
		List<Reservation> reservations = reservationService.findByRoomId(roomId);
		return new ResponseEntity<>(toReservationDTO.convert(reservations), HttpStatus.OK);
	}
	

}
