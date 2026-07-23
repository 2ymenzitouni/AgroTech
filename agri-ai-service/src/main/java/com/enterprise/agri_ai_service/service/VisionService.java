import org.springframework.core.io.ByteArrayResource;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Map;

@Service
public class VisionService {

    private final RestTemplate restTemplate = new RestTemplate();
    private final String fastapiUrl = "http://localhost:8000/detect"; // FastAPI YOLOv8 endpoint

    public Map<String, Object> analyzeLeafImage(MultipartFile file) throws IOException {
        // 1. Prepare headers for multipart form data
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.MULTIPART_FORM_DATA);

        // 2. Wrap MultipartFile bytes into a Resource
        ByteArrayResource contentsAsResource = new ByteArrayResource(file.getBytes()) {
            @Override
            public String getFilename() {
                return file.getOriginalFilename();
            }
        };

        // 3. Build body payload
        MultiValueMap<String, Object> body = new LinkedMultiValueMap<>();
        body.add("file", contentsAsResource);

        HttpEntity<MultiValueMap<String, Object>> requestEntity = new HttpEntity<>(body, headers);

        // 4. Send POST request to FastAPI service
        ResponseEntity<Map> response = restTemplate.postForEntity(fastapiUrl, requestEntity, Map.class);

        // Returns your JSON: {"plant": "Tomato", "disease": "Early Blight", "confidence": 0.98}
        return response.getBody();
    }
}