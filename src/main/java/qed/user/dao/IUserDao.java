package qed.user.dao;

import qed.user.model.User;

public interface IUserDao {
	
	public void add(User user);
	
	public User loadByUsername(String username);
	
}
