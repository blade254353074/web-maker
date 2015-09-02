package qed.user.dao;

import java.io.IOException;
import java.sql.SQLException;

import org.dbunit.DatabaseUnitException;
import org.dbunit.dataset.DataSetException;
import org.dbunit.dataset.IDataSet;
import org.dbunit.operation.DatabaseOperation;
import org.junit.After;
import org.junit.Assert;
import org.junit.Before;
import org.junit.Test;

import qed.user.model.User;
import qed.user.util.AbstractDbUnitTestCase;
import qed.user.util.EntitiesHelper;

public class TestUserDao extends AbstractDbUnitTestCase {
	
	private IUserDao userDao;
	
	@Before
	public void setUp() throws DataSetException, IOException, SQLException {
		userDao = new UserDao();
		bakcupOneTable("t_user");
	}
	
	@Test
	public void testLoad() throws IOException, DatabaseUnitException, SQLException {
		IDataSet dataSet = createDateSet("t_user");
		DatabaseOperation.CLEAN_INSERT.execute(dbunitCon, dataSet);
		User user = userDao.loadByUsername("admin");
	    EntitiesHelper.assertUser(user);
	}
	
	
	@Test
	public void testAdd() throws IOException, DatabaseUnitException, SQLException {
		IDataSet dataSet = createDateSet("t_user");
		DatabaseOperation.TRUNCATE_TABLE.execute(dbunitCon, dataSet);
	    User user = new User("admin", "123", "管理员");
	    userDao.add(user);
	    Assert.assertTrue(user.getId() > 0);
	    
	    User user2 = userDao.loadByUsername("admin");
	    EntitiesHelper.assertUser(user2, user);
	}
	
	
	@After
	public void tearDown() throws DatabaseUnitException, SQLException, IOException {
		resumeTable();
	}
	
	
}
