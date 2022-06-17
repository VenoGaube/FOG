package si.fri.fog.pojo;


import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
public enum Stage {
    SUBMITTED("submitted"),
    IN_PRELIMINARY_REVIEW("inPreliminaryReview"),
    IN_REVIEW("inReview"),
    REVISION("revision"),
    ACCEPTED("accepted"),
    REJECTED("rejected")
    ;

    private final String name;

    public static Stage getStageFromName(String name){
        for (Stage s : Stage.values()){
            if (s.name.equalsIgnoreCase(name)){
                return s;
            }
        }
        throw new IllegalArgumentException("No stage for this stage: " + name);
    }
}
