const WEBHOOK_URL = 'https://discord.com/api/webhooks/1564011267474071612/gW90gDZ-aqsksqGuxN8DYBBDp0si8oER-7nU7bkx0_CCvotBOegifFl9t3bq-H2o0rX9';
const form = document.getElementById('appealForm');
const submitBtn = document.getElementById('submitBtn');
const statusEl = document.getElementById('status');
form.addEventListener(
  'submit',
  async(e) => {
    e.preventDefault();
    const username = document.getElementById('username').value.trim();
    const reason = document.getElementById('reason').value.trim();
    const behavior = document.getElementById('behavior').value.trim();
    if (!username || !reason || !behavior) {
      showStatus('Please fill in all fields.', 'error');
      return;
    }
    submitBtn.disabled = true;
    submitBtn.textContent = 'Sending...';
    showStatus('', '');
    const payload = {
      username: 'Team 005x5 Ban Appeal',
      embeds: [
        {
          title: 'New Ban Appeal - Team 005x5',
          color: 5793266,
          fields: [
            {
              name: 'Username',
              value: username,
              inline: false
            },
            {
              name: 'Why they were banned',
              value: reason,
              inline: false
            },
            {
              name: 'Future behavior',
              value: behavior,
              inline: false
            }
          ],
          timestamp: new Date().toISOString(),
          footer: {
            text: 'Team 005x5 Ban Appeal System'
          }
        }
      ]
    };
    try {
      const res = await fetch(
        WEBHOOK_URL,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(payload)
        }
      );
      if (res.ok) {
        showStatus('Appeal submitted successfully!', 'success');
        form.reset();
      } else {
        showStatus('Failed to submit. Please try again later.', 'error');
      }
    } catch (err) {
      console.error(err);
      showStatus('Network error. Please try again.', 'error');
    } finally {
      submitBtn.disabled = false;
      submitBtn.textContent = 'Submit Appeal';
    }
  }
);
function showStatus(message, type) {
  statusEl.textContent = message;
  statusEl.className = 'status ' + (type || '');
}
