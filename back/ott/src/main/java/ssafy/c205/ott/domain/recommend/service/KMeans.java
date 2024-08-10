package ssafy.c205.ott.domain.recommend.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Random;
import lombok.Getter;
import ssafy.c205.ott.domain.account.entity.Member;

public class KMeans {

    private int k;
    private List<Member> members;
    @Getter
    private List<Member> centroids;
    @Getter
    private List<List<Member>> clusters;

    public KMeans(int k, List<Member> members) {
        this.k = k;
        this.members = members;
        this.centroids = new ArrayList<>(k);
    }

    private void initializeCentroids() {
        Random rand = new Random();
        for (int i = 0; i < k; i++) {
            Member centroid = members.get(rand.nextInt(members.size()));
            centroids.add(
                new Member(centroid.getWeight(), centroid.getHeight(), centroid.getId()));
        }
    }

    private List<List<Member>> assignMembersToClusters() {
        List<List<Member>> clusters = new ArrayList<>();
        for (int i = 0; i < k; i++) {
            clusters.add(new ArrayList<>());
        }

        for (Member member : members) {
            double minDistance = Double.MAX_VALUE;
            int nearestCentroidIndex = 0;

            for (int i = 0; i < centroids.size(); i++) {
                double distance = member.distance(centroids.get(i));
                if (distance < minDistance) {
                    minDistance = distance;
                    nearestCentroidIndex = i;
                }
            }

            clusters.get(nearestCentroidIndex).add(member);
        }

        return clusters;
    }

    private void updateCentroids(List<List<Member>> clusters) {
        for (int i = 0; i < k; i++) {
            List<Member> cluster = clusters.get(i);
            float sumHeight = 0, sumWeight = 0;

            for (Member member : cluster) {
                sumHeight += member.getHeight();
                sumWeight += member.getWeight();
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
            clusters = assignMembersToClusters();
            List<Member> oldCentroids = new ArrayList<>();
            for (Member centroid : centroids) {
                oldCentroids.add(new Member(centroid.getWeight(), centroid.getHeight(), centroid.getId()));
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

    public List<Member> findClusterContainingMember(Long memberId) {
        for (List<Member> cluster : clusters) {
            for (Member member : cluster) {
                if (member.getId().equals(memberId)) {
                    return cluster;
                }
            }
        }
        return null;  // Return null if member not found in any cluster
    }
}