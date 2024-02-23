package huang.wt.traveltracker.repo;

import huang.wt.traveltracker.model.City;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface CityRepo extends JpaRepository<City, Long> {
    Optional<City> findCityById(Long id);

    void deleteCityById(Long id);
}
