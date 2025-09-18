// import { useState, useEffect } from "react";
// import { Button } from "@/components/ui/button";
// import { Card } from "@/components/ui/card";
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
// import { Mic, MicOff, Video, VideoOff, Phone, MessageSquare, Users, Settings, Share2 } from "lucide-react";
// import { useParams, useNavigate } from "react-router-dom";

// export function VideoCallPage() {
//   const [isMuted, setIsMuted] = useState(false);
//   const [isVideoOff, setIsVideoOff] = useState(false);
//   const [isScreenSharing, setIsScreenSharing] = useState(false);
//   const { id } = useParams();
//   const navigate = useNavigate();

//   // Mock interview data - in production, fetch this based on ID
//   const interview = {
//     candidate: "Alex Chen",
//     position: "Senior Frontend Developer",
//     avatar: "/professional-headshot.png",
//     interviewer: "Jennifer Smith",
//     duration: "45 min",
//   };

//   return (
//     <div className="min-h-screen bg-background">
//       {/* Header */}
//       <header className="border-b bg-card/50 backdrop-blur supports-[backdrop-filter]:bg-card/50">
//         <div className="container mx-auto px-4 py-4">
//           <div className="flex items-center justify-between">
//             <div className="flex items-center gap-4">
//               <h2 className="font-semibold">{interview.position} Interview</h2>
//               <div className="h-4 w-[1px] bg-border" />
//               <span className="text-sm text-muted-foreground">Duration: {interview.duration}</span>
//             </div>
//             <Button variant="outline" size="sm" className="gap-2">
//               <Users className="h-4 w-4" />
//               2 Participants
//             </Button>
//           </div>
//         </div>
//       </header>

//       <main className="container mx-auto px-4 py-8">
//         <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
//           {/* Main Video Area */}
//           <div className="lg:col-span-3 space-y-4">
//             <div className="aspect-video relative rounded-xl overflow-hidden bg-black">
//               {/* Main video stream would go here */}
//               <div className="absolute bottom-4 right-4">
//                 <Card className="w-48 aspect-video bg-background/80 backdrop-blur">
//                   {/* Self video preview would go here */}
//                 </Card>
//               </div>
//             </div>

//             {/* Controls */}
//             <div className="flex items-center justify-center gap-4">
//               <Button
//                 variant={isMuted ? "destructive" : "secondary"}
//                 size="lg"
//                 className="rounded-full h-12 w-12 p-0"
//                 onClick={() => setIsMuted(!isMuted)}
//               >
//                 {isMuted ? <MicOff className="h-5 w-5" /> : <Mic className="h-5 w-5" />}
//               </Button>
              
//               <Button
//                 variant={isVideoOff ? "destructive" : "secondary"}
//                 size="lg"
//                 className="rounded-full h-12 w-12 p-0"
//                 onClick={() => setIsVideoOff(!isVideoOff)}
//               >
//                 {isVideoOff ? <VideoOff className="h-5 w-5" /> : <Video className="h-5 w-5" />}
//               </Button>

//               <Button
//                 variant="destructive"
//                 size="lg"
//                 className="rounded-full h-12 w-12 p-0"
//                 onClick={() => navigate('/interviews')}
//               >
//                 <Phone className="h-5 w-5 rotate-[135deg]" />
//               </Button>

//               <Button
//                 variant={isScreenSharing ? "destructive" : "secondary"}
//                 size="lg"
//                 className="rounded-full h-12 w-12 p-0"
//                 onClick={() => setIsScreenSharing(!isScreenSharing)}
//               >
//                 <Share2 className="h-5 w-5" />
//               </Button>

//               <Button
//                 variant="secondary"
//                 size="lg"
//                 className="rounded-full h-12 w-12 p-0"
//               >
//                 <Settings className="h-5 w-5" />
//               </Button>
//             </div>
//           </div>

//           {/* Sidebar */}
//           <Card className="lg:col-span-1">
//             <div className="p-4 border-b">
//               <h3 className="font-semibold">Participants</h3>
//             </div>
//             <div className="p-4 space-y-4">
//               <div className="flex items-center gap-3">
//                 <Avatar>
//                   <AvatarImage src={interview.avatar} />
//                   <AvatarFallback>{interview.candidate[0]}</AvatarFallback>
//                 </Avatar>
//                 <div>
//                   <p className="font-medium">{interview.candidate}</p>
//                   <p className="text-sm text-muted-foreground">Candidate</p>
//                 </div>
//               </div>
//               <div className="flex items-center gap-3">
//                 <Avatar>
//                   <AvatarFallback>{interview.interviewer[0]}</AvatarFallback>
//                 </Avatar>
//                 <div>
//                   <p className="font-medium">{interview.interviewer}</p>
//                   <p className="text-sm text-muted-foreground">Interviewer</p>
//                 </div>
//               </div>
//             </div>
//           </Card>
//         </div>
//       </main>
//     </div>
//   );
// }
import { useEffect, useRef, useState } from "react";
import io, { Socket } from "socket.io-client";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Mic, MicOff, Video, VideoOff, Phone, Share2, Settings } from "lucide-react";
import { useNavigate } from "react-router-dom";

const socket: Socket = io("http://localhost:5000"); // your signaling server

export function VideoCallPage() {
  const localVideoRef = useRef<HTMLVideoElement | null>(null);
  const remoteVideoRef = useRef<HTMLVideoElement | null>(null);
  const peerConnection = useRef<RTCPeerConnection | null>(null);

  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOff, setIsVideoOff] = useState(false);
  const [isScreenSharing, setIsScreenSharing] = useState(false);

  const navigate = useNavigate();
  const roomId = "interview-room"; // could come from params

  useEffect(() => {
    const startCall = async () => {
      const localStream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });

      if (localVideoRef.current) {
        localVideoRef.current.srcObject = localStream;
      }

      peerConnection.current = new RTCPeerConnection();

      // Add local tracks
      localStream.getTracks().forEach((track) => {
        peerConnection.current?.addTrack(track, localStream);
      });

      // Remote stream
      peerConnection.current.ontrack = (event) => {
        if (remoteVideoRef.current) {
          remoteVideoRef.current.srcObject = event.streams[0];
        }
      };

      // ICE candidates
      peerConnection.current.onicecandidate = (event) => {
        if (event.candidate) {
          socket.emit("signal", { roomId, data: { candidate: event.candidate } });
        }
      };

      // Join room
      socket.emit("join", roomId);

      // When new user joins
      socket.on("user-joined", async () => {
        if (!peerConnection.current) return;
        const offer = await peerConnection.current.createOffer();
        await peerConnection.current.setLocalDescription(offer);
        socket.emit("signal", { roomId, data: { sdp: offer } });
      });

      // Handle incoming signals
      socket.on("signal", async ({ data }) => {
        if (!peerConnection.current) return;

        if (data.sdp) {
          await peerConnection.current.setRemoteDescription(
            new RTCSessionDescription(data.sdp)
          );
          if (data.sdp.type === "offer") {
            const answer = await peerConnection.current.createAnswer();
            await peerConnection.current.setLocalDescription(answer);
            socket.emit("signal", { roomId, data: { sdp: answer } });
          }
        } else if (data.candidate) {
          await peerConnection.current.addIceCandidate(
            new RTCIceCandidate(data.candidate)
          );
        }
      });
    };

    startCall();

    return () => {
      socket.off("user-joined");
      socket.off("signal");
      peerConnection.current?.close();
    };
  }, [roomId]);

  // 🔹 Controls
  const toggleMute = () => {
    const stream = localVideoRef.current?.srcObject as MediaStream;
    stream?.getAudioTracks().forEach((track) => (track.enabled = isMuted));
    setIsMuted(!isMuted);
  };

  const toggleVideo = () => {
    const stream = localVideoRef.current?.srcObject as MediaStream;
    stream?.getVideoTracks().forEach((track) => (track.enabled = isVideoOff));
    setIsVideoOff(!isVideoOff);
  };

  const toggleScreenShare = async () => {
    if (!peerConnection.current) return;

    if (!isScreenSharing) {
      const screenStream = await navigator.mediaDevices.getDisplayMedia({ video: true });
      const screenTrack = screenStream.getVideoTracks()[0];

      const sender = peerConnection.current.getSenders().find(s => s.track?.kind === "video");
      sender?.replaceTrack(screenTrack);

      screenTrack.onended = () => {
        toggleScreenShare(); // revert back to camera when stopped
      };
    } else {
      const camStream = await navigator.mediaDevices.getUserMedia({ video: true });
      const camTrack = camStream.getVideoTracks()[0];
      const sender = peerConnection.current.getSenders().find(s => s.track?.kind === "video");
      sender?.replaceTrack(camTrack);
    }

    setIsScreenSharing(!isScreenSharing);
  };

  return (
    <div className="min-h-screen bg-background">
      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Video Area */}
          <div className="lg:col-span-3 space-y-4">
            <div className="aspect-video relative rounded-xl overflow-hidden bg-black">
              {/* Remote video */}
              <video ref={remoteVideoRef} autoPlay playsInline className="w-full h-full object-cover" />

              {/* Self preview */}
              <video
                ref={localVideoRef}
                autoPlay
                playsInline
                muted
                className="w-48 aspect-video absolute bottom-4 right-4 rounded-xl"
              />
            </div>

            {/* Controls */}
            <div className="flex items-center justify-center gap-4">
              <Button
                variant={isMuted ? "destructive" : "secondary"}
                size="lg"
                className="rounded-full h-12 w-12 p-0"
                onClick={toggleMute}
              >
                {isMuted ? <MicOff className="h-5 w-5" /> : <Mic className="h-5 w-5" />}
              </Button>

              <Button
                variant={isVideoOff ? "destructive" : "secondary"}
                size="lg"
                className="rounded-full h-12 w-12 p-0"
                onClick={toggleVideo}
              >
                {isVideoOff ? <VideoOff className="h-5 w-5" /> : <Video className="h-5 w-5" />}
              </Button>

              <Button
                variant="destructive"
                size="lg"
                className="rounded-full h-12 w-12 p-0"
                onClick={() => navigate("/interviews")}
              >
                <Phone className="h-5 w-5 rotate-[135deg]" />
              </Button>

              <Button
                variant={isScreenSharing ? "destructive" : "secondary"}
                size="lg"
                className="rounded-full h-12 w-12 p-0"
                onClick={toggleScreenShare}
              >
                <Share2 className="h-5 w-5" />
              </Button>

              <Button
                variant="secondary"
                size="lg"
                className="rounded-full h-12 w-12 p-0"
              >
                <Settings className="h-5 w-5" />
              </Button>
            </div>
          </div>

          {/* Sidebar Placeholder */}
          <Card className="lg:col-span-1 p-4">
            <h3 className="font-semibold mb-2">Participants</h3>
            <p className="text-sm text-muted-foreground">This can be fetched dynamically</p>
          </Card>
        </div>
      </main>
    </div>
  );
}
