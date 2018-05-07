package org.seckill.dao;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.seckill.entity.SuccessKilled;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import javax.annotation.Resource;

import static org.junit.Assert.*;

@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration({"classpath:spring/spring-dao.xml"})
public class SuccessKilledDaoTest {

    @Resource
    private SuccessKilledDao successKilledDao;

    @Test
    public void insertSuccessKille() {
        long id = 1001L;
        long phone = 12345678910L;
        int insertCount = successKilledDao.insertSuccessKille(id,phone);
        System.out.println(insertCount);

    }

    @Test
    public void queryByidWithSeckill() {
        long id = 1001L;
        long phone = 12345678910L;
        SuccessKilled successKilled = successKilledDao.queryByidWithSeckill(id, phone);
        System.out.println(successKilled);
        System.out.println(successKilled.getSeckill());

    }
}