package huang.wt.traveltracker.controller;

import huang.wt.traveltracker.model.City;
import huang.wt.traveltracker.service.CityService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/city")
public class CityResource {
    private final CityService cityService;

    @Autowired
    public CityResource(CityService cityService) {
        this.cityService = cityService;
    }
    
    @GetMapping("/all")
    public ResponseEntity<List<City>> getAllCities() {
        List<City> cities = cityService.findAllCities();
        return new ResponseEntity<>(cities, HttpStatus.OK);
    }

    @GetMapping("/find/{id}")
    public ResponseEntity<City> getCityById(@PathVariable("id") Long id) {
        City city = cityService.findCityById(id);
        return new ResponseEntity<>(city, HttpStatus.OK);
    }

    @PostMapping("/add")
    public ResponseEntity<City> addCity(@RequestBody City city) {
        City newCity = cityService.addCity(city);
        return new ResponseEntity<>(newCity, HttpStatus.CREATED);
    }
    
    @PutMapping("/update")
    public ResponseEntity<City> updateCity(@RequestBody City city) {
        City newCity = cityService.updateCity(city);
        return new ResponseEntity<>(newCity, HttpStatus.OK);
    }
    
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deleteCityById(@PathVariable("id") Long id) {
        cityService.deleteCity(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
