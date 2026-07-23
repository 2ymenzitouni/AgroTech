import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.Map;

@RestController
@RequestMapping("/api/robot")
@CrossOrigin(origins = "*") // Adjust for your frontend URL
public class RobotController {

    private final VisionService visionService;

    public RobotController(VisionService visionService) {
        this.visionService = visionService;
    }

    @PostMapping("/analyze")
    public ResponseEntity<Map<String, Object>> simulateInspection(@RequestParam("file") MultipartFile file) {
        try {
            // Forward image to FastAPI and get YOLOv8 analysis result
            Map<String, Object> detectionResult = visionService.analyzeLeafImage(file);
            
            // Optional: Save inspection to PostgreSQL database here using your JPA repository!

            return ResponseEntity.ok(detectionResult);
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body(Map.of("error", e.getMessage()));
        }
    }
}