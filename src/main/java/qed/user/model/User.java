package qed.user.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
//@Table(name = "t_user", catalog = "qed_test")
public class User implements java.io.Serializable {

	private int id;
	private String username;
	private String password;
	private String nickname;

	public User() {
	}

	public User(String username, String password, String nickname) {
		super();
		this.username = username;
		this.password = password;
		this.nickname = nickname;
	}

	public User(int id, String username, String password, String nickname) {
		super();
		this.id = id;
		this.username = username;
		this.password = password;
		this.nickname = nickname;
	}

	@Id
	@Column(name = "id", unique = true, nullable = false, length = 30)
	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	@Column(name = "username", nullable = false, length = 30)
	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	@Column(name = "password", nullable = false, length = 30)
	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	@Column(name = "nickname", length = 30)
	public String getNickname() {
		return nickname;
	}

	public void setNickname(String nickname) {
		this.nickname = nickname;
	}

}
