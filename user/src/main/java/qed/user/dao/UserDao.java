package qed.user.dao;

import org.hibernate.Session;

import qed.user.model.User;
import qed.user.util.HibernateUtil;

public class UserDao implements IUserDao {

	public void add(User user) {
		Session session = null;
		try {
			session = HibernateUtil.openSession();
			
			session.save(user);
			
			session.getTransaction().commit();
		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			HibernateUtil.close(session);
		}
	}

	public User loadByUsername(String username) {
		Session session = null;
		User user = null;
		try {
			session = HibernateUtil.openSession();
			user = (User) session.createQuery("from User where username=?").setParameter(0, username).uniqueResult();
			
		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			HibernateUtil.close(session);
		}
		return user;
	}

}
