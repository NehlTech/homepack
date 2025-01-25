export interface Service {
  name: string;
  desc: string;
  bgColor: string;
  textColor: string;
  backgroundImage: string;
  hoverVideo: string;
}

export const services: Service[] = [
  {
    name: "Home Care",
    desc: "Home Care provides professional medical assistance and personal support to patients in their homes, ensuring comfort and convenience.",
    bgColor: "rgba(254, 182, 13, .2)",
    textColor: "#FEB60D",
    hoverVideo:
      "https://videos.pexels.com/video-files/7517699/7517699-uhd_2560_1440_25fps.mp4",
    backgroundImage:
      "https://images.pexels.com/photos/7551622/pexels-photo-7551622.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  },
  {
    name: "Telemedicine",
    desc: "Medical practitioners provide online consultations, prescribe medication and order tests. This is useful for basic non-emergency illnesses and this is better than self-medication.",
    bgColor: "rgba(151, 113, 255, .2)",
    textColor: "#9771FF",
    hoverVideo:
      "https://videos.pexels.com/video-files/7195995/7195995-uhd_2732_1440_25fps.mp4",
    backgroundImage:
      "https://images.pexels.com/photos/19957212/pexels-photo-19957212/free-photo-of-smiling-black-doctor-talking-on-video-call-on-cellphone.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  },
  {
    name: "First Aid Training",
    desc: "First-aid, CPR, elder/child care workshops to equip people to handle medical emergencies.",
    bgColor: "rgba(1, 181, 197, .2)",
    textColor: "#01B5C5",
    hoverVideo:
      "https://videos.pexels.com/video-files/3981867/3981867-uhd_2560_1440_30fps.mp4",
    backgroundImage:
      "https://images.pexels.com/photos/11655091/pexels-photo-11655091.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  },
];
