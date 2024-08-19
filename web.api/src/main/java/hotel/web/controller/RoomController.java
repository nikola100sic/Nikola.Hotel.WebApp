package hotel.web.controller;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import hotel.model.Room;
import hotel.service.RoomService;
import hotel.support.RoomToRoomDTO;
import hotel.web.dto.RoomDTO;

@RestController
@RequestMapping(value = "/api/rooms", produces = MediaType.APPLICATION_JSON_VALUE)
public class RoomController {

	@Autowired
	private RoomService roomService;

	@Autowired
	private RoomToRoomDTO toRoomDTO;

	@GetMapping
	public ResponseEntity<List<RoomDTO>> getAll(@RequestParam(required = false) Double priceFrom,
			@RequestParam(required = false) Double priceTo, @RequestParam(required = false) Integer capacity,
			@RequestParam(value = "pageNo", defaultValue = "0") int pageNo) {

		Page<Room> page;

		page = roomService.find(priceFrom, priceTo, capacity, pageNo);

		HttpHeaders headers = new HttpHeaders();
		headers.add("Total-Pages", Integer.toString(page.getTotalPages()));

		return new ResponseEntity<>(toRoomDTO.convert(page.getContent()), headers, HttpStatus.OK);
	}

	@GetMapping("/{id}")
	public ResponseEntity<RoomDTO> getOne(@PathVariable Long id) {
		Room room = roomService.findOne(id);

		if (room != null) {
			return new ResponseEntity<>(toRoomDTO.convert(room), HttpStatus.OK);
		} else {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}

	@GetMapping("/capacities")
	public ResponseEntity<List<Integer>> getAllCapacities() {
		List<Integer> capacities = roomService.getAllCapacities();
		return ResponseEntity.ok(capacities);
	}

	@GetMapping("/available")
	public ResponseEntity<List<RoomDTO>> getAvailableRooms(@RequestParam("startDate") String startDate,
			@RequestParam("endDate") String endDate, @RequestParam("capacity") Integer capacity) {
		List<Room> rooms = null;
		try {
			LocalDate dateFromParam = null;
			LocalDate dateToParam = null;

			if (startDate != null) {
				dateFromParam = getLocalDate(startDate);
			}
			if (endDate != null) {
				dateToParam = getLocalDate(endDate);
			}

			rooms = roomService.getAvailableRooms(dateFromParam, dateToParam, capacity);
		} catch (Exception e) {
//			rooms = roomService.findAll();
		}

		return new ResponseEntity<>(toRoomDTO.convert(rooms), HttpStatus.OK);
	}

	@ExceptionHandler(value = DataIntegrityViolationException.class)
	public ResponseEntity<Void> handle() {
		return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
	}

	private LocalDate getLocalDate(String dateString) {
		DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
		return LocalDate.parse(dateString, formatter);
	}

}
