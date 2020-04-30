package com.droneconnector.configuration;


import com.dronegcs.mavlink.spring.MavlinkSpringConfig;
import com.generic_tools.environment.Environment;
import com.generic_tools.logger.Logger;
import com.generic_tools.validations.RuntimeValidator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Import;
import org.springframework.messaging.simp.config.MessageBrokerRegistry;
import org.springframework.web.socket.config.annotation.AbstractWebSocketMessageBrokerConfigurer;
import org.springframework.web.socket.config.annotation.EnableWebSocketMessageBroker;
import org.springframework.web.socket.config.annotation.StompEndpointRegistry;

@Import({MavlinkSpringConfig.class})
@Configuration
@EnableWebSocketMessageBroker
public class WebSocketConfiguration extends AbstractWebSocketMessageBrokerConfigurer {

    @Bean
    public Environment environment() {
        return new Environment();
    }

    @Bean
    public Logger logger(@Autowired Environment environment) {
        return new Logger(environment);
    }

    @Bean
    public RuntimeValidator runtimeValidator() {
        return new RuntimeValidator();
    }

    @Override
    public void configureMessageBroker(MessageBrokerRegistry config) {
        config.enableSimpleBroker("/topic/", "/queue/");
        config.setApplicationDestinationPrefixes("/app");
    }

    @Override
    public void registerStompEndpoints(StompEndpointRegistry registry) {
        System.out.println("Endpotin");
        registry.addEndpoint("/greeting").setAllowedOrigins("*").withSockJS();
    }
}


