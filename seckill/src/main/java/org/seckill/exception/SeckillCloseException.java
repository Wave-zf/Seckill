package org.seckill.exception;

/**
 * 秒杀关闭异常，防止关闭后还可以秒杀
 */
public class SeckillCloseException extends SeckillException{
    public SeckillCloseException(String message) {
        super(message);
    }

    public SeckillCloseException(String message, Throwable cause) {
        super(message, cause);
    }
}
