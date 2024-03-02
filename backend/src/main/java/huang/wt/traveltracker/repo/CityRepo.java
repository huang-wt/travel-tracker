package huang.wt.traveltracker.repo;

import huang.wt.traveltracker.model.City;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface CityRepo extends JpaRepository<City, Long> {
    Optional<City> findCityById(Long id);

    void deleteCityById(Long id);

    @Query("SELECT DISTINCT city.country from City city")
    List<String> findDistinctCountries();
}
