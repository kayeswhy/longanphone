// This script ensures that exportWithPermissionCheck is properly defined
// and fixes any conflicts with inline definitions

// Flag to prevent multiple exports
let isExporting = false;

// Check if window.exportWithPermissionCheck is already defined
if (typeof window.exportWithPermissionCheck !== 'function') {
    // Define exportWithPermissionCheck if it's not already defined
    // Progress modal functions
    function showExportProgressModal() {
        const overlay = document.getElementById('export-progress-modal-overlay');
        overlay.style.display = 'flex';
        setTimeout(() => {
            overlay.classList.add('visible');
        }, 10);
    }

    function hideExportProgressModal() {
        const overlay = document.getElementById('export-progress-modal-overlay');
        overlay.classList.remove('visible');
        setTimeout(() => {
            overlay.style.display = 'none';
        }, 300);
    }

    function updateExportProgress(current, total, status) {
        const statusText = document.getElementById('export-status-text');
        const progressBar = document.getElementById('export-progress-bar');
        const progressText = document.getElementById('export-progress-text');
        
        if (statusText) statusText.textContent = status;
        
        if (total > 0) {
            const percentage = Math.round((current / total) * 100);
            if (progressBar) progressBar.style.width = percentage + '%';
            if (progressText) progressText.textContent = percentage + '%';
        }
    }

    window.exportWithPermissionCheck = function() {
        console.log("🔍 [EXPORT DEBUG] exportWithPermissionCheck called");
        // Prevent multiple exports
        if (isExporting) {
            console.log("🔍 [EXPORT DEBUG] Export already in progress, skipping");
            return;
        }
        
        isExporting = true;
        console.log("🔍 [EXPORT DEBUG] Setting isExporting to true");
        
        // Show progress modal
        showExportProgressModal();
        updateExportProgress(0, 100, '正在准备导出...');
        
        // Make sure Cordova is ready before proceeding
        console.log("🔍 [EXPORT DEBUG] Waiting for Cordova ready...");
        window.onCordovaReady(function() {
            console.log("🔍 [EXPORT DEBUG] Cordova ready, calling tryExport");
            tryExport();
        });
    };
    
    // Helper function to try exporting
    function tryExport() {
        console.log("🔍 [EXPORT DEBUG] tryExport function called");
        try {
            console.log("🔍 [EXPORT DEBUG] Checking database availability...");
            if (typeof db === 'undefined') {
                console.error("🚨 [EXPORT ERROR] Database is undefined");
                hideExportProgressModal();
                alert('数据库未初始化，无法导出数据。');
                isExporting = false;
                return;
            }
            console.log("🔍 [EXPORT DEBUG] Database is available");
            
            // Get data from database
            console.log("🔍 [EXPORT DEBUG] Starting database queries in export.js...");
            updateExportProgress(10, 100, '正在读取数据库...');
            Promise.all([
                db.chats.toArray(),
                db.worldBooks.toArray(),
                db.userStickers.toArray(),
                db.apiConfig.get('main'),
                db.globalSettings.get('main'),
                db.personaPresets.toArray(),
                db.musicLibrary.get('main'),
                db.qzoneSettings.get('main'),
                db.qzonePosts.toArray(),
                db.qzoneAlbums.toArray(),
                db.qzonePhotos.toArray(),
                db.favorites.toArray(),
                db.qzoneGroups.toArray(),
                db.memories.toArray()
            ]).then(function(results) {
                console.log("🔍 [EXPORT DEBUG] Database queries completed, processing results...");
                const [
                    chats, worldBooks, userStickers, apiConfig, globalSettings,
                    personaPresets, musicLibrary, qzoneSettings, qzonePosts,
                    qzoneAlbums, qzonePhotos, favorites, qzoneGroups,
                    memories
                ] = results;
                
                console.log("🔍 [EXPORT DEBUG] Data counts:");
                console.log("  - Chats:", chats.length);
                console.log("  - WorldBooks:", worldBooks.length);
                console.log("  - UserStickers:", userStickers.length);
                console.log("  - ApiConfig:", apiConfig ? "found" : "not found");
                console.log("  - GlobalSettings:", globalSettings ? "found" : "not found");
                console.log("  - PersonaPresets:", personaPresets.length);
                console.log("  - MusicLibrary:", musicLibrary ? "found" : "not found");
                console.log("  - QzoneSettings:", qzoneSettings ? "found" : "not found");
                console.log("  - QzonePosts:", qzonePosts.length);
                console.log("  - QzoneAlbums:", qzoneAlbums.length);
                console.log("  - QzonePhotos:", qzonePhotos.length);
                console.log("  - Favorites:", favorites.length);
                console.log("  - QzoneGroups:", qzoneGroups.length);
                console.log("  - Memories:", memories.length);
                
                console.log("🔍 [EXPORT DEBUG] Creating backup data object...");
                const backupData = {
                    version: 1,
                    timestamp: Date.now(),
                    chats, worldBooks, userStickers, apiConfig, globalSettings,
                    personaPresets, musicLibrary, qzoneSettings, qzonePosts,
                    qzoneAlbums, qzonePhotos, favorites, qzoneGroups,
                    memories
                };
                
                console.log("🔍 [EXPORT DEBUG] Converting to JSON...");
                updateExportProgress(30, 100, '正在生成备份文件...');
                // Use compact JSON (no pretty printing) to reduce size
                const jsonStr = JSON.stringify(backupData);
                console.log("🔍 [EXPORT DEBUG] JSON created, size:", jsonStr.length, "characters");
                
                // Log file size info
                const fileSizeMB = (jsonStr.length / 1024 / 1024).toFixed(2);
                console.log("🔍 [EXPORT DEBUG] File size:", fileSizeMB, "MB");
                updateExportProgress(50, 100, '正在准备保存文件...');
                
                console.log("🔍 [EXPORT DEBUG] Creating filename...");
                // Create a unique filename with date and time to prevent overwriting
                const now = new Date();
                const dateStr = now.toISOString().split('T')[0];
                const timeStr = now.toTimeString().split(' ')[0].replace(/:/g, '-');
                const fileName = `LycheePhone备份_${dateStr}_${timeStr}.json`;
                console.log("🔍 [EXPORT DEBUG] Filename created:", fileName);
                
                // Try to save to the downloads directory
                console.log("🔍 [EXPORT DEBUG] Calling saveToDownloads...");
                saveToDownloads(jsonStr, fileName);
                
                // Helper function to write large files using streaming approach
                function writeFileInChunks(fileWriter, data, fileName) {
                    console.log("🔍 [EXPORT DEBUG] Starting chunked file write for large data");
                    
                    const chunkSize = 512 * 1024; // 512KB chunks - smaller for better memory management
                    let position = 0;
                    let currentChunk = 0;
                    const totalChunks = Math.ceil(data.length / chunkSize);
                    
                    console.log("🔍 [EXPORT DEBUG] Total chunks needed:", totalChunks);
                    
                    function writeNextChunk() {
                        if (position >= data.length) {
                            console.log("🔍 [EXPORT DEBUG] All chunks written successfully!");
                            updateExportProgress(100, 100, '导出完成！');
                            setTimeout(() => {
                                hideExportProgressModal();
                                alert('备份文件已保存到下载文件夹: ' + fileName);
                            }, 500);
                            isExporting = false;
                            return;
                        }
                        
                        currentChunk++;
                        const chunk = data.slice(position, position + chunkSize);
                        console.log("🔍 [EXPORT DEBUG] Writing chunk", currentChunk, "of", totalChunks, 
                                   "- size:", chunk.length, "bytes");
                        
                        // Update progress
                        const progress = Math.round((currentChunk / totalChunks) * 50) + 50; // 50-100% for writing
                        updateExportProgress(progress, 100, `正在写入文件... (${currentChunk}/${totalChunks})`);
                        
                        try {
                            const blob = new Blob([chunk], { type: 'text/plain' });
                            
                            fileWriter.onwriteend = function() {
                                console.log("🔍 [EXPORT DEBUG] Chunk", currentChunk, "written successfully");
                                position += chunkSize;
                                // Small delay to prevent overwhelming the system
                                setTimeout(writeNextChunk, 50);
                            };
                            
                            fileWriter.onerror = function(e) {
                                console.error("🚨 [EXPORT ERROR] Chunk write failed:", e);
                                hideExportProgressModal();
                                alert('分块写入失败在第 ' + currentChunk + ' 块: ' + (e.message || e.toString()));
                                isExporting = false;
                            };
                            
                            // For first chunk, just write. For subsequent chunks, seek to end and write
                            if (position === 0) {
                                fileWriter.write(blob);
                            } else {
                                fileWriter.seek(fileWriter.length); // Seek to end of file
                                fileWriter.write(blob);
                            }
                            
                        } catch (chunkError) {
                            console.error("🚨 [EXPORT ERROR] Chunk processing failed:", chunkError);
                            hideExportProgressModal();
                            alert('处理第 ' + currentChunk + ' 块时出错: ' + chunkError.message);
                            isExporting = false;
                        }
                    }
                    
                    writeNextChunk();
                }

                function saveToDownloads(jsonStr, fileName) {
                    console.log("🔍 [EXPORT DEBUG] saveToDownloads called");
                    // Try to save to the downloads directory
                    if (window.cordova && window.cordova.file) {
                        console.log("🔍 [EXPORT DEBUG] Cordova file system available");
                        // Try to save to the downloads directory
                        const directory = cordova.file.externalRootDirectory + 'Download/';
                        console.log("🔍 [EXPORT DEBUG] Target directory:", directory);
                        
                        console.log("🔍 [EXPORT DEBUG] Resolving directory...");
                        window.resolveLocalFileSystemURL(directory, function(dirEntry) {
                            console.log("🔍 [EXPORT DEBUG] Directory resolved, creating file...");
                            dirEntry.getFile(fileName, { create: true, exclusive: false }, function(fileEntry) {
                                console.log("🔍 [EXPORT DEBUG] File created, creating writer...");
                                fileEntry.createWriter(function(fileWriter) {
                                    console.log("🔍 [EXPORT DEBUG] File writer created, setting up callbacks...");
                                    fileWriter.onwriteend = function() {
                                        console.log("🔍 [EXPORT DEBUG] File write completed successfully");
                                        alert('备份文件已保存到下载文件夹: ' + fileName);
                                        isExporting = false;
                                    };
                                    
                                    fileWriter.onerror = function(e) {
                                        console.error("🚨 [EXPORT ERROR] File write error:", e);
                                        alert('写入文件失败: ' + (e.message || e.toString()));
                                        isExporting = false;
                                    };
                                    
                                    console.log("🔍 [EXPORT DEBUG] Determining write strategy...");
                                    
                                    // For large files (>10MB), use chunked writing
                                    if (jsonStr.length > 10 * 1024 * 1024) {
                                        console.log("🔍 [EXPORT DEBUG] Large file detected, using chunked write strategy");
                                        writeFileInChunks(fileWriter, jsonStr, fileName);
                                    } else {
                                        console.log("🔍 [EXPORT DEBUG] Normal size file, using standard blob write");
                                        try {
                                            const blob = new Blob([jsonStr], { type: 'application/json' });
                                            console.log("🔍 [EXPORT DEBUG] Blob created, size:", blob.size, "bytes");
                                            
                                            fileWriter.onwriteend = function() {
                                                console.log("🔍 [EXPORT DEBUG] File write completed successfully");
                                                updateExportProgress(100, 100, '导出完成！');
                                                setTimeout(() => {
                                                    hideExportProgressModal();
                                                    alert('备份文件已保存到下载文件夹: ' + fileName);
                                                }, 500);
                                                isExporting = false;
                                            };
                                            
                                            fileWriter.onerror = function(e) {
                                                console.error("🚨 [EXPORT ERROR] File write error:", e);
                                                hideExportProgressModal();
                                                alert('写入文件失败: ' + (e.message || e.toString()));
                                                isExporting = false;
                                            };
                                            
                                            console.log("🔍 [EXPORT DEBUG] Writing blob to file...");
                                            updateExportProgress(75, 100, '正在写入文件...');
                                            fileWriter.write(blob);
                                            
                                        } catch (blobError) {
                                            console.error("🚨 [EXPORT ERROR] Blob creation failed:", blobError);
                                            hideExportProgressModal();
                                            alert('创建文件数据失败: ' + blobError.message);
                                            isExporting = false;
                                        }
                                    }
                                }, function(error) {
                                    console.error("🚨 [EXPORT ERROR] Create writer failed:", error);
                                    hideExportProgressModal();
                                    alert('创建文件写入器失败: ' + (error.message || error.toString()));
                                    isExporting = false;
                                });
                            }, function(error) {
                                console.error("🚨 [EXPORT ERROR] Create file failed:", error);
                                hideExportProgressModal();
                                alert('创建文件失败: ' + (error.message || error.toString()));
                                isExporting = false;
                            });
                        }, function(error) {
                            console.error("🚨 [EXPORT ERROR] Resolve directory failed:", error);
                            hideExportProgressModal();
                            alert('访问下载目录失败: ' + (error.message || error.toString()));
                            isExporting = false;
                        });
                    } else {
                        console.log("🔍 [EXPORT DEBUG] Using browser fallback");
                        // Browser fallback
                        try {
                            console.log("🔍 [EXPORT DEBUG] Creating blob for browser...");
                            const blob = new Blob([jsonStr], { type: 'application/json' });
                            console.log("🔍 [EXPORT DEBUG] Browser blob created, size:", blob.size, "bytes");
                            const url = URL.createObjectURL(blob);
                            console.log("🔍 [EXPORT DEBUG] Object URL created");
                            const link = Object.assign(document.createElement('a'), {
                                href: url,
                                download: fileName
                            });
                            console.log("🔍 [EXPORT DEBUG] Triggering download...");
                            updateExportProgress(100, 100, '导出完成！');
                            setTimeout(() => {
                                hideExportProgressModal();
                                link.click();
                                URL.revokeObjectURL(url);
                                console.log("🔍 [EXPORT DEBUG] Browser export completed");
                                alert('备份文件已导出');
                            }, 500);
                            isExporting = false;
                        } catch (browserError) {
                            console.error("🚨 [EXPORT ERROR] Browser export failed:", browserError);
                            hideExportProgressModal();
                            alert('浏览器导出失败: ' + browserError.message);
                            isExporting = false;
                        }
                    }
                }
            }).catch(function(error) {
                console.error("🚨 [EXPORT ERROR] Export failed:", error);
                console.error("🚨 [EXPORT ERROR] Error stack:", error.stack);
                hideExportProgressModal();
                alert('导出数据错误: ' + error.message);
                isExporting = false;
            });
        } catch (error) {
            console.error("🚨 [EXPORT ERROR] Export function error:", error);
            console.error("🚨 [EXPORT ERROR] Error stack:", error.stack);
            hideExportProgressModal();
            alert('导出函数错误: ' + error.message);
            isExporting = false;
        }
    }
}

// Make sure all export buttons use the correct function
document.addEventListener('DOMContentLoaded', function() {
    var exportButtons = document.querySelectorAll('#export-data-btn');
    exportButtons.forEach(function(button) {
        // Remove any existing click listeners
        var newButton = button.cloneNode(true);
        button.parentNode.replaceChild(newButton, button);
        
        // Add the correct listener
        newButton.addEventListener('click', function() {
            window.exportWithPermissionCheck();
        });
    });
});