package com.hva.nl.ewa.services;

import com.byteowls.jopencage.JOpenCageGeocoder;
import com.byteowls.jopencage.model.JOpenCageForwardRequest;
import com.byteowls.jopencage.model.JOpenCageLatLng;
import com.byteowls.jopencage.model.JOpenCageResponse;
import org.springframework.stereotype.Service;

@Service
public class GeocodingService {

    public JOpenCageLatLng addressToCoordinates(String street, String number, String city) {
        JOpenCageGeocoder jOpenCageGeocoder = new JOpenCageGeocoder("fb7b28495c844fcebb2adae6374004a9");
        JOpenCageForwardRequest request = new JOpenCageForwardRequest(
                street + " " + number + " " + city
        );
        request.setRestrictToCountryCode("NL"); // restrict results to a specific country

        JOpenCageResponse response = jOpenCageGeocoder.forward(request);
        return response.getFirstPosition();
    }
}
