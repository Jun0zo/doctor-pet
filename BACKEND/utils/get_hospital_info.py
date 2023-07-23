import requests
import pandas as pd
import requests
import math

kakao_api_key = "24299e47c1aa254d0479f313eb36e7cc"

# address -> coords
def get_lat_long_from_address(address):
    url = f"https://dapi.kakao.com/v2/local/search/address.json"
    headers = {"Authorization": f"KakaoAK {kakao_api_key}"}
    params = {"query": address.strip()}

    response = requests.get(url, headers=headers, params=params)
    data = response.json()

    if "documents" in data:
        documents = data["documents"]
        if len(documents) > 0:
            latitude = documents[0]["y"]
            longitude = documents[0]["x"]
            return latitude, longitude

    return None, None

# coords -> city_name
def get_city_from_lat_long(coords):
    url = "https://dapi.kakao.com/v2/local/geo/coord2regioncode.json"
    headers = {"Authorization": f"KakaoAK {kakao_api_key}"}
    params = {"x": coords[1], "y": coords[0]}

    try:
        response = requests.get(url, headers=headers, params=params)
        data = response.json()

        # Extract the city name from the API response
        city = data['documents'][0]['region_2depth_name']
        return city

    except Exception as e:
        print(f"Error: {e}")

    return None


# distance between two latitudes and longitudes
def haversine_distance(lat1, lon1, lat2, lon2):
    # Convert latitude and longitude from degrees to radians
    lat1_rad = math.radians(lat1)
    lon1_rad = math.radians(lon1)
    lat2_rad = math.radians(lat2)
    lon2_rad = math.radians(lon2)

    # Haversine formula
    dlon = lon2_rad - lon1_rad
    dlat = lat2_rad - lat1_rad
    a = math.sin(dlat/2)**2 + math.cos(lat1_rad) * math.cos(lat2_rad) * math.sin(dlon/2)**2
    c = 2 * math.atan2(math.sqrt(a), math.sqrt(1-a))
    earth_radius_km = 6371.0
    distance_km = earth_radius_km * c

    return distance_km

def sort_coordinates_by_distance(hospital_info, current_coords):
    hospital_info['distance'] = hospital_info.apply(lambda row: haversine_distance(current_coords[0], current_coords[1], float(row['latitude']), float(row['longitude'])), axis=1)
    # sort hospital_info by distance
    hospital_info = hospital_info.sort_values(by=['distance'])
    
    return hospital_info

def get_sorted_hospitals_nearby(current_coords):
    city_name = get_city_from_lat_long(current_coords)
    hospital_info = pd.read_csv(f"{city_name}.csv", index_col=0, encoding='CP949', names=['idx', 'name', 'address', 'telephone'])
    
    # add coords column
    hospital_info[['latitude', 'longitude']] = hospital_info.apply(lambda row: pd.Series(get_lat_long_from_address(row['address'])), axis=1)
    hospital_info = hospital_info.dropna(subset=['latitude', 'longitude'])
    sorted_hospital_info = sort_coordinates_by_distance(hospital_info, current_coords)
    return sorted_hospital_info