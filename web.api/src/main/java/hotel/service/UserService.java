package hotel.service;

import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Page;

import hotel.model.User;
import hotel.web.dto.UserChangePasswordDTO;

public interface UserService {

	Optional<User> findOne(Long id);

	List<User> findAll();

	Page<User> findAll(int pageNo);

	User save(User user);

	User delete(Long id);

	Optional<User> findbyUsername(String username);

	boolean changePassword(Long id, UserChangePasswordDTO userChangePasswordDto);
}
