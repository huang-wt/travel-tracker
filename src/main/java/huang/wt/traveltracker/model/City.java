package huang.wt.traveltracker.model;

import jakarta.persistence.*;

import java.io.Serializable;

@Entity
public class City implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(nullable = false, updatable = false)
    private Long id;
    private String name;
    private String country;
    private String visitedYear;
    private Integer rating;
    private String review;
    private String imageUrl;

    public City() {}

    public City(Long id, String name, String country, String visitedYear, Integer rating, String review, String imageUrl) {
        this.id = id;
        this.name = name;
        this.country = country;
        this.visitedYear = visitedYear;
        this.rating = rating;
        this.review = review;
        this.imageUrl = imageUrl;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getCountry() {
        return country;
    }

    public void setCountry(String country) {
        this.country = country;
    }

    public String getVisitedYear() {
        return visitedYear;
    }

    public void setVisitedYear(String visitedYear) {
        this.visitedYear = visitedYear;
    }

    public Integer getRating() {
        return rating;
    }

    public void setRating(Integer rating) {
        this.rating = rating;
    }

    public String getReview() {
        return review;
    }

    public void setReview(String review) {
        this.review = review;
    }

    public String getImageUrl() {
        return imageUrl;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }

    @Override
    public String toString() {
        return "City{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", country='" + country + '\'' +
                ", visitedYear='" + visitedYear + '\'' +
                ", rating=" + rating +
                ", review='" + review + '\'' +
                ", imageUrl='" + imageUrl + '\'' +
                '}';
    }
}
