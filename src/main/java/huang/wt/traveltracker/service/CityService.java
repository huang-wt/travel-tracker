package huang.wt.traveltracker.service;

import huang.wt.traveltracker.exception.UserNotFoundException;
import huang.wt.traveltracker.model.City;
import huang.wt.traveltracker.repo.CityRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
public class CityService {
    
    private final CityRepo cityRepo;

    @Autowired
    public CityService(CityRepo cityRepo) {
        this.cityRepo = cityRepo;
    }
    
    public City addCity(City city) {
        return cityRepo.save(city);
    }
    
    public List<City> findAllCities() {
        return cityRepo.findAll();
    }
    
    public City updateCity(City city) {
        return cityRepo.save(city);
    }
    
    public City findCityById(Long id) {
        return cityRepo.findCityById(id)
                .orElseThrow(() -> new UserNotFoundException("User by id " + id + " was not found"));
    }
    
    public void deleteCity(Long id) {
        cityRepo.deleteCityById(id);
    }
    
}
