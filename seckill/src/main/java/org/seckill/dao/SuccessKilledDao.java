package org.seckill.dao;

import org.apache.ibatis.annotations.Param;
import org.seckill.entity.SuccessKilled;

public interface SuccessKilledDao {

    /**
     * 插入购买商品
     * @param seckillId
     * @param userPhone
     * @return
     */
    int insertSuccessKille(@Param("seckillId") long seckillId,@Param("userPhone") long userPhone);

    /**
     * 根据id查购买成功并携带秒杀商品实体对象
     * @param seckillId
     * @return
     */
    SuccessKilled queryByidWithSeckill(@Param("seckillId") long seckillId,@Param("userPhone") long userPhone);
}
