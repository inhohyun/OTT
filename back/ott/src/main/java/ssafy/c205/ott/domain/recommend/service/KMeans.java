package ssafy.c205.ott.domain.recommend.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Random;
import ssafy.c205.ott.domain.account.entity.Member;

public class KMeans {

    private int k;
    private List<User> users;
    private List<User> centroids;
    private List<List<User>> clusters;

    public KMeans(int k, List<User> users) {
        this.k = k;
        this.users = users;
        this.centroids = new ArrayList<>(k);
    }

    private void initializeCentroids() {
        Random rand = new Random();
        for (int i = 0; i < k; i++) {
            User centroid = users.get(rand.nextInt(users.size()));
            centroids.add(
                new User(centroid.getHeight(), centroid.getWeight(), centroid.getMemberId()));
        }
    }

    private List<List<User>> assignUsersToClusters() {
        List<List<User>> clusters = new ArrayList<>();
        for (int i = 0; i < k; i++) {
            clusters.add(new ArrayList<>());
        }

        for (User user : users) {
            double minDistance = Double.MAX_VALUE;
            int nearestCentroidIndex = 0;

            for (int i = 0; i < centroids.size(); i++) {
                double distance = user.distance(centroids.get(i));
                if (distance < minDistance) {
                    minDistance = distance;
                    nearestCentroidIndex = i;
                }
            }

            clusters.get(nearestCentroidIndex).add(user);
        }

        return clusters;
    }

    private void updateCentroids(List<List<User>> clusters) {
        for (int i = 0; i < k; i++) {
            List<User> cluster = clusters.get(i);
            float sumHeight = 0, sumWeight = 0;

            for (User user : cluster) {
                sumHeight += user.getHeight();
                sumWeight += user.getWeight();
            }

            if (cluster.size() > 0) {
                float newHeight = sumHeight / cluster.size();
                float newWeight = sumWeight / cluster.size();
                centroids.get(i).update(newHeight, newWeight);
            }
        }
    }

    public void performClustering() {
        initializeCentroids();

        boolean converged = false;
        while (!converged) {
            clusters = assignUsersToClusters();
            List<User> oldCentroids = new ArrayList<>();
            for (User centroid : centroids) {
                oldCentroids.add(new User(centroid.getHeight(), centroid.getWeight(), 1L));
            }

            updateCentroids(clusters);

            // Check for convergence (if centroids do not change)
            converged = true;
            for (int i = 0; i < centroids.size(); i++) {
                if (oldCentroids.get(i).distance(centroids.get(i)) != 0) {
                    converged = false;
                    break;
                }
            }
        }
    }
    public List<User> getCentroids() {
        return centroids;
    }

    public List<List<User>> getClusters() {
        return clusters;
    }
    public List<User> findClusterContainingMember(Long memberId) {
        for (List<User> cluster : clusters) {
            for (User user : cluster) {
                if (user.getMemberId().equals(memberId)) {
                    return cluster;
                }
            }
        }
        return null;  // Return null if member not found in any cluster
    }
}
