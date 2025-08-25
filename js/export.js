// Simple browser-only export functionality

// Flag to prevent multiple exports
let isExporting = false;

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

// Main export function
window.exportWithPermissionCheck = function() {
    
    // Prevent multiple exports
    if (isExporting) {
        return;
    }
    
    isExporting = true;
    
    // Show progress modal
    showExportProgressModal();
    updateExportProgress(0, 100, '正在准备导出...');
    
    try {
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
            const [
                chats, worldBooks, userStickers, apiConfig, globalSettings,
                personaPresets, musicLibrary, qzoneSettings, qzonePosts,
                qzoneAlbums, qzonePhotos, favorites, qzoneGroups,
                memories
            ] = results;
            
            updateExportProgress(50, 100, '正在生成备份文件...');
            
            const backupData = {
                version: 1,
                timestamp: Date.now(),
                chats, worldBooks, userStickers, apiConfig, globalSettings,
                personaPresets, musicLibrary, qzoneSettings, qzonePosts,
                qzoneAlbums, qzonePhotos, favorites, qzoneGroups,
                memories
            };
            
            const jsonStr = JSON.stringify(backupData);
            
            // Create filename
            const now = new Date();
            const dateStr = now.toISOString().split('T')[0];
            const timeStr = now.toTimeString().split(' ')[0].replace(/:/g, '-');
            const fileName = `LycheePhone备份_${dateStr}_${timeStr}.json`;
            
            updateExportProgress(90, 100, '正在下载文件...');
            
            // Browser download
            const blob = new Blob([jsonStr], { type: 'application/json' });
            const url = URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = fileName;
            link.style.display = 'none';
            
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            
            setTimeout(() => URL.revokeObjectURL(url), 1000);
            
            updateExportProgress(100, 100, '导出完成！');
            setTimeout(() => {
                hideExportProgressModal();
                alert('备份文件已导出: ' + fileName);
                isExporting = false;
            }, 500);
            
        }).catch(function(error) {
            hideExportProgressModal();
            alert('导出数据错误: ' + error.message);
            isExporting = false;
        });
        
    } catch (error) {
        hideExportProgressModal();
        alert('导出函数错误: ' + error.message);
        isExporting = false;
    }
};

// Set up export button when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(function() {
        const exportButtons = document.querySelectorAll('#export-data-btn');
        
        exportButtons.forEach(function(button) {
            // Remove any existing listeners
            button.onclick = null;
            
            // Add click listener
            button.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                
                if (typeof window.exportWithPermissionCheck === 'function') {
                    window.exportWithPermissionCheck();
                } else {
                    alert('Export function not available');
                }
            });
        });
    }, 1000);
});