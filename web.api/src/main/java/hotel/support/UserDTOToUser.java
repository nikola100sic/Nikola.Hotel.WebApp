package hotel.support;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.convert.converter.Converter;
import org.springframework.stereotype.Component;

import hotel.model.User;
import hotel.service.UserService;
import hotel.web.dto.UserDTO;

@Component
public class UserDTOToUser implements Converter<UserDTO, User> {

	@Autowired
	private UserService userService;

	@Override
	public User convert(UserDTO userDTO) {
		User user = null;
		if (userDTO.getId() != null) {
			user = userService.findOne(userDTO.getId()).get();
		}

		if (user == null) {
			user = new User();
		}

		user.setUsername(userDTO.getUsername());
		user.seteMail(userDTO.geteMail());
		user.setName(userDTO.getName());
		user.setSurname(userDTO.getSurname());

		return user;
	}

}
