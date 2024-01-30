package com.example.ReactiveKafka.Model;


public class BusLocation {
    private int id;
    private double longitude;
    private double latitude;

    public int getId() {
        return id;
    }

    @Override
    public String toString() {
        return "BusLocation{" +
                "id=" + id +
                ", longitude=" + longitude +
                ", latitude=" + latitude +
                '}';
    }

    public void setId(int id) {
        this.id = id;
    }

    public double getLongitude() {
        return longitude;
    }

    public void setLongitude(double longitude) {
        this.longitude = longitude;
    }

    public double getLatitude() {
        return latitude;
    }

    public void setLatitude(double latitude) {
        this.latitude = latitude;
    }

//    @JsonCreator
//    public BusLocation(@JsonProperty("id") int id,
//                       @JsonProperty("latitude") double latitude,
//                       @JsonProperty("longitude") double longitude) {
//        this.id = id;
//        this.latitude = latitude;
//        this.longitude = longitude;
//    }


//    private void toString(String s) {
//    }
}

