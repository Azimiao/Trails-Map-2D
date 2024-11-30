import React, { useState, useEffect } from "react";
import {
    Box,
    Slider,
    Typography,
    IconButton,
    List,
    ListItem,
    Collapse,
} from "@material-ui/core";
import {
    PlayArrow,
    Pause,
    SkipNext,
    SkipPrevious,
    QueueMusic,
    ExpandLess,
    ExpandMore,
    MusicNote,
} from "@material-ui/icons";

import BGMHelper from "@/assets/BGMHelper";

/**
 * 媒体播放器控件
 * AI 辅助编写，待整理
 */
const MusicPlayer = () => {
    const [currentSongIndex, setCurrentSongIndex] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const [progress, setProgress] = useState(0);
    const [isPlaylistOpen, setIsPlaylistOpen] = useState(false);
    const [currentTime, setCurrentTime] = useState("0:00");
    const [duration, setDuration] = useState("0:00");

    const [audio] = useState(new Audio());
    const audioRef = audio;
    const playlist = BGMHelper.bgm;

    const formatTime = (time) => {
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60).toString().padStart(2, "0");
        return `${minutes}:${seconds}`;
    };

    const handlePlayPause = () => {
        if (!audioRef) return;

        setIsPlaying((prev) => {
            if (prev) {
                audioRef.pause();
            } else {
                audioRef.play();
            }
            return !prev;    
        });
    };

    const handlePrev = () => {
        setCurrentSongIndex((prev) => (prev > 0 ? prev - 1 : playlist.length - 1));
        if(!isPlaying){
            handlePlayPause();
        }
    };

    const handleNext = () => {
        setCurrentSongIndex((prev) => (prev < playlist.length - 1 ? prev + 1 : 0));
        if(!isPlaying){
            handlePlayPause();
        }
    };

    const handleProgressChange = (event, value) => {
        const audio = audioRef;
        if (audio && audio.duration) {

            audio.currentTime = (value / 100) * audio.duration;
            setProgress(value);
            
            if(!isPlaying)
            {
                setIsPlaying(true);
            }
        }
    };

    const handleTimeUpdate = () => {
        const audio = audioRef;
        if (audio) {
            setCurrentTime(formatTime(audio.currentTime));
            setProgress((audio.currentTime / audio.duration) * 100);
        }
    };

    const handleSongLoaded = () => {
        const audio = audioRef;
        if (audio) {
            setDuration(formatTime(audio.duration));
        }
    };

    const handleSongEnd = () => {
        handleNext(); // 自动切换到下一首
    };

    const handleSongIndex = (index)=>{
        setCurrentSongIndex(index);
        if(!isPlaying)
            {
                setIsPlaying(true);
            }
    }

    const togglePlaylist = () => {
        setIsPlaylistOpen((prev) => !prev);
    };
    

    useEffect(() => {
        const audio = audioRef;

        // 加载新音频
        audio.src = playlist[currentSongIndex].url;
        // audio.load();

        // 自动播放
        if (isPlaying) {
            audio.play();
        }

        // 绑定事件监听
        audio.addEventListener("loadedmetadata", handleSongLoaded);
        audio.addEventListener("timeupdate", handleTimeUpdate);
        audio.addEventListener("ended", handleSongEnd);

        return () => {
            // 清理事件监听
            audio.removeEventListener("loadedmetadata", handleSongLoaded);
            audio.removeEventListener("timeupdate", handleTimeUpdate);
            audio.removeEventListener("ended", handleSongEnd);
        };
    }, [currentSongIndex, isPlaying]); // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <Box px={2} py={1} >
            {/* 标题 */}
            <Typography variant="body1" color="primary" gutterBottom>
                <MusicNote style={{verticalAlign:"middle"}} />&nbsp;
                {playlist[currentSongIndex].title}
            </Typography>

            {/* 进度条 */}
            <Box mx={1}>
                <Slider
                    value={progress}
                    onChange={handleProgressChange}
                    aria-labelledby="progress-slider"
                    style={{ height: 1 }}
                />
            </Box>

            {/* 播放时间和控制按钮 */}
            <Box display="flex" alignItems="center" justifyContent="space-between">
                {/* 播放时间 */}
                <Typography variant="body2" color="primary">{currentTime} / {duration}</Typography>

                {/* 控制按钮 */}
                <Box display="flex" justifyContent="center" gap={1}>
                    <IconButton style={{padding:"6px"}} size="medium" color="primary" onClick={handlePrev}>
                        <SkipPrevious fontSize="medium" />
                    </IconButton>
                    <IconButton style={{padding:"6px"}} size="medium" color="primary" onClick={handlePlayPause}>
                        {isPlaying ? <Pause fontSize="medium" /> : <PlayArrow fontSize="medium" />}
                    </IconButton>
                    <IconButton style={{padding:"6px"}} size="medium" color="primary" onClick={handleNext}>
                        <SkipNext fontSize="medium" />
                    </IconButton>
                </Box>

                {/* 播放列表按钮 */}
                <IconButton style={{padding:"6px"}} size="medium" color="primary" onClick={togglePlaylist}>
                    <QueueMusic fontSize="medium" />
                    {isPlaylistOpen ? <ExpandLess fontSize="medium" /> : <ExpandMore fontSize="medium" />}
                </IconButton>
            </Box>

            {/* 播放列表 */}
            <Collapse in={isPlaylistOpen}>
                <List>
                    {playlist.map((song, index) => (
                        <ListItem
                            style={{
                                borderRadius:"10px",
                            }}
                            button
                            key={index}
                            selected={index === currentSongIndex}
                            onClick={() => handleSongIndex(index)}
                        >
                            {song.title}
                        </ListItem>
                    ))}
                </List>
            </Collapse>
        </Box>
    );
};

export default MusicPlayer;
