package com.hva.nl.ewa.helpers;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class ModelMapperHelper<T, E> {

    private final ModelMapper mapper;

    @Autowired
    public ModelMapperHelper(ModelMapper modelMapper) {
        this.mapper = modelMapper;
    }

    public E ModelToDTO(T model, Class<E> target) { return this.mapper.map(model, target); }

    public E DTOToModel(T dto, Class<E> target) {
       return this.mapper.map(dto, target);
    }
}
