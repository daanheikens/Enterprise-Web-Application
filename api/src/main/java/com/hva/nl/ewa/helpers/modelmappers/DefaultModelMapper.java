package com.hva.nl.ewa.helpers.modelmappers;

import com.hva.nl.ewa.models.Model;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

/**
 * Helper class to map Models to DTO objects.
 * Any custom properties which should be configured can be done manually or by configuring a converter
 */
@Component
public class DefaultModelMapper {

    private final ModelMapper mapper;

    @Autowired
    public DefaultModelMapper(ModelMapper modelMapper) {
        this.mapper = modelMapper;
    }

    public <E> E ModelToDTO(Model model, Class<E> target) {
        return this.mapper.map(model, target);
    }
}
