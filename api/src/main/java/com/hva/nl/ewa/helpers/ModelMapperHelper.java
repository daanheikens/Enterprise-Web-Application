package com.hva.nl.ewa.helpers;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class ModelMapperHelper {

    private final ModelMapper mapper;

    @Autowired
    public ModelMapperHelper(ModelMapper modelMapper) {
        this.mapper = modelMapper;
    }

    public <T, E> E ModelToDTO(T model, Class<E> target) {
        return this.mapper.map(model, target);
    }

    public <T, E> E DTOToModel(T dto, Class<E> target) {
        return this.mapper.map(dto, target);
    }
}
