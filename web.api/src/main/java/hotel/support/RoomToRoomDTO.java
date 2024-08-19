package hotel.support;

import java.util.ArrayList;
import java.util.List;

import org.springframework.core.convert.converter.Converter;
import org.springframework.stereotype.Component;

import hotel.model.Room;
import hotel.web.dto.RoomDTO;

@Component
public class RoomToRoomDTO implements Converter<Room, RoomDTO> {

	@Override
	public RoomDTO convert(Room room) {
		RoomDTO dto = new RoomDTO();
		dto.setId(room.getId());
		dto.setCapacity(room.getCapacity());
		dto.setNumber(room.getNumber());
		dto.setPrice(room.getPrice());

		return dto;
	}

	public List<RoomDTO> convert(List<Room> rooms) {
		List<RoomDTO> roomDTOs = new ArrayList<>();

		for (Room room : rooms) {
			roomDTOs.add(convert(room));
		}

		return roomDTOs;
	}

}
